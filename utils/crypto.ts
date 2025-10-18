import forge from "node-forge";
export interface UserSignature {
  emailHash: string;
  emailSignature: string;
}

class CryptoUtils {
  private hexToBytes(hex: string): string {
    return forge.util.hexToBytes(hex);
  }
  async verifySignature(emailHash: string, signature: string, publicKey: string): Promise<boolean> {
    try {
      const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
      const hashBytes = this.hexToBytes(emailHash);
      const md = forge.md.sha384.create();
      md.update(hashBytes);

      const signatureBytes = forge.util.decode64(signature);

      const verified = publicKeyObj.verify(md.digest().bytes(), signatureBytes);

      return verified;
    } catch (err) {
      return false;
    }
  }

  async verifyUserSignature(user: UserSignature, publicKey: string): Promise<boolean> {
    if (!user.emailHash || !user.emailSignature) return false;
    return this.verifySignature(user.emailHash, user.emailSignature, publicKey);
  }
}

export default new CryptoUtils();
