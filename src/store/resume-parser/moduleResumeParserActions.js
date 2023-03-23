import axios from "@/libs/axios";
import constants from "@/constants";
import moment from "moment";

const dateFormats = [
  "MM-DD-YYYY",
  "MM/DD/YYYY",
  "MM.DD.YYYY",
  "YYYY-MM-DD",
  "YYYY/MM/DD",
  "YYYY.MM.DD",
];
let dateValidator = function (value) {
  return moment(value, dateFormats).isValid();
};
let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export default {
  async parseResume(_, payload) {
    const parser = await axios.post(
      `${constants.resumeParserUrl}/parser`,
      payload,
      config
    );
    return parser.data;
  },
  async getPersonality(_, payload) {
    const personality = await axios.post(
      `${constants.resumeParserUrl}/softskill`,
      payload
    );
    return personality.data;
  },
  async submitFeedback(_, payload) {
    const feedback = await axios.post(
      `${constants.resumeParserUrl}/feedback`,
      payload
    );
    return feedback.data;
  },

  async syncEditor(_, payload) {
    const _id = payload.id;
    const data = payload.syncData;
    let fResponse = {};
    if (data.personal_details) {
      let pDetails = {
        firstName: data.personal_details.name.firstName,
        lastName: data.personal_details.name.lastName,
        careerObjective: data.personal_details.careerObjective,
        address: data.personal_details.address.fullAddress,
        contactNumber: data.personal_details.contactDetails.contactNumber,
        skypeProfile: data.personal_details.contactDetails.skypeProfile,
        personalWebsite: data.personal_details.contactDetails.website,
        linkedinProfile: data.personal_details.contactDetails.linkedinProfile,
        githubProfile: data.personal_details.contactDetails.githubProfile,
        facebookProfile: data.personal_details.contactDetails.facebookProfile,
        twitterProfile: data.personal_details.contactDetails.twitterProfile,
      };
      let dob = data.personal_details.address.dob;
      if (dateValidator(dob)) {
        pDetails = { ...pDetails, dob: moment.utc(dob) };
      }
      let res = await axios.patch(
        `${constants.apiHost}/users/${_id}`,
        pDetails
      );
      fResponse = { ...fResponse, ...res.data };
    }
    if (data.work_details) {
      if (data.work_details.length) {
        for (let i = 0; i < data.work_details.length; i++) {
          let wDetails = { ...data.work_details[i] };
          let startDate = wDetails.startDate;
          let endDate = wDetails.endDate;
          if (dateValidator(startDate)) {
            wDetails.startDate = moment.utc(startDate);
          } else {
            wDetails.startDate = null;
          }
          if (dateValidator(endDate)) {
            wDetails.endDate = moment.utc(endDate);
          } else {
            wDetails.endDate = null;
          }
          wDetails = { ...wDetails, userId: _id, sortId: i };
          const resObj = await axios.post(
            `${constants.apiHost}/career-history`,
            wDetails
          );
          fResponse = { ...fResponse, ...resObj.data };
        }
      }
    }
    if (data.education_details) {
      if (data.education_details.length) {
        for (let i = 0; i < data.education_details.length; i++) {
          let eDetails = { ...data.education_details[i] };
          let startDate = eDetails.startDate;
          let endDate = eDetails.endDate;
          if (dateValidator(startDate)) {
            eDetails.startDate = moment.utc(startDate);
          } else {
            eDetails.startDate = null;
          }
          if (dateValidator(endDate)) {
            eDetails.endDate = moment.utc(endDate);
          } else {
            eDetails.endDate = null;
          }
          eDetails = { ...eDetails, userId: _id, sortId: i };
          const resObj = await axios.post(
            `${constants.apiHost}/educational-qualifications`,
            eDetails
          );
          fResponse = { ...fResponse, ...resObj.data };
        }
      }
    }
    if (data.skills || data.languages || data.hobbies) {
      const extraCurricularData = await axios.get(
        `${constants.apiHost}/extra-curricular`,
        { params: { userId: _id } }
      );
      const extraCurricularId = extraCurricularData.data.data[0]._id;
      let skills = [];
      let hobbies = [];
      let languages = [];
      let extraCurricular = {};
      if (data.skills) {
        if (data.skills.length) {
          for (let i = 0; i < data.skills.length; i++) {
            skills = [...skills, { title: data.skills[i].name, level: 0 }];
          }
          extraCurricular = { ...extraCurricular, skills: skills };
        }
      }
      if (data.languages) {
        if (data.languages.length) {
          for (let i = 0; i < data.languages.length; i++) {
            languages = [
              ...languages,
              { title: { label: data.languages[i].name }, level: 0 },
            ];
          }
          extraCurricular = { ...extraCurricular, languages: languages };
        }
      }
      if (data.hobbies) {
        if (data.hobbies.length) {
          for (let i = 0; i < data.hobbies.length; i++) {
            let hobbieLbl = data.hobbies[i].hobby;
            hobbieLbl = hobbieLbl.replace(/(^\s*)|(\s*$)/gi, "");
            hobbies = [...hobbies, { metaData: { label: hobbieLbl } }];
          }
          extraCurricular = { ...extraCurricular, hobbies: hobbies };
        }
      }
      if (Object.keys(extraCurricular).length) {
        const resObj = await axios.patch(
          `${constants.apiHost}/extra-curricular/${extraCurricularId}`,
          extraCurricular
        );
        fResponse = { ...fResponse, ...resObj.data };
      }
    }
    if (data.projects) {
      if (data.projects.length) {
        for (let i = 0; i < data.projects.length; i++) {
          let projects = {
            userId: _id,
            organization: data.projects[i].organization,
            title: data.projects[i].title,
            description: data.projects[i].description,
            projectPictureUrl: data.projects[i].projectPictureUrl,
            sortId: i,
          };
          const resObj = await axios.post(
            `${constants.apiHost}/projects`,
            projects
          );
          fResponse = { ...fResponse, ...resObj.data };
        }
      }
    }
    function setPersonalityCharacteristics(ch) {
      ch = ch
        .replace(/(^\s*)|(\s*$)/gi, "")
        .replace(/[ ]{2,}/gi, " ")
        .replace(/\s/g, "-")
        .toLowerCase();
      return ch;
    }
    if (data.predicted_characteristics) {
      if (data.predicted_characteristics.length) {
        const prevPersonalityData = await axios.get(
          `${constants.apiHost}/personality`,
          { params: { userId: _id } }
        );
        const personalityId = prevPersonalityData.data.data[0]._id;
        let personalityTraits = [];        
        for (let i = 0; i < data.predicted_characteristics.length; i++) {
          console.log("predicted", data.predicted_characteristics[i][0]);
          let predict_char = setPersonalityCharacteristics(
            data.predicted_characteristics[i][0]
          );
          let newValue = { id: predict_char };
          personalityTraits = [...personalityTraits, newValue];
        }
        let chars = {
          personalityTraits: personalityTraits,
        };
        const resObj = await axios.patch(
          `${constants.apiHost}/personality/${personalityId}`,
          chars
        );
        fResponse = { ...fResponse, ...resObj.data };
      }
    }
    return fResponse;
  },
};
