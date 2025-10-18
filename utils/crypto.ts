// utils/crypto.ts
import forge from "node-forge";

export interface UserSignature {
  emailHash: string;      // hex SHA-384 hash from backend
  emailSignature: string; // base64 RSA signature from backend
}

class CryptoUtils {
  /**
   * Convert hex string to bytes
   */
  private hexToBytes(hex: string): string {
    return forge.util.hexToBytes(hex);
  }

  /**
   * Verify RSA-SHA384 signature created by Node.js crypto.sign()
   */
  async verifySignature(emailHash: string, signature: string, publicKey: string): Promise<boolean> {
    try {
      // Parse PEM public key
      const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);

      // Convert hex digest (backend hash) to bytes
      const hashBytes = this.hexToBytes(emailHash);

      // Create SHA-384 message digest
      const md = forge.md.sha384.create();
      md.update(hashBytes);

      // Decode signature (base64)
      const signatureBytes = forge.util.decode64(signature);

      // Verify the signature using RSA-SHA384
      const verified = publicKeyObj.verify(md.digest().bytes(), signatureBytes);

      return verified;
    } catch (err) {
      console.error("❌ Signature verification failed:", err);
      return false;
    }
  }

  /**
   * Verify a user signature object
   */
  async verifyUserSignature(user: UserSignature, publicKey: string): Promise<boolean> {
    if (!user.emailHash || !user.emailSignature) return false;
    return this.verifySignature(user.emailHash, user.emailSignature, publicKey);
  }
}

export default new CryptoUtils();
