import { ethers } from 'ethers'

const signingMessage = async (_message, signer) => {
  const message = `Hello, world! ${_message}`
  console.log('message', message)
  const messageHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(message))
  const signature = await signer.signMessage(messageHash)
  console.log('signature', signature)
  return { signature, messageHash }
}

const recoverAddress = (messageHash, signature, signersAddress) => {
  const recoveredAddress = ethers.utils.verifyMessage(messageHash, signature)
  console.log('recoveredAddress', recoveredAddress)
  return recoveredAddress === signersAddress
}

export { signingMessage, recoverAddress }
