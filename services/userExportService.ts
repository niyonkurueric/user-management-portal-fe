// services/userExportService.ts
import { api } from "@/lib/axios";
import protobuf from "protobufjs";
import type { User } from "@/types/user";
import cryptoUtils from "@/utils/crypto";


const UserMessage = new protobuf.Type("User")
  .add(new protobuf.Field("id", 1, "int32"))
  .add(new protobuf.Field("name", 2, "string"))
  .add(new protobuf.Field("emailHash", 3, "string"))
  .add(new protobuf.Field("role", 4, "string"))
  .add(new protobuf.Field("status", 5, "string"))
  .add(new protobuf.Field("emailSignature", 6, "string"))
  .add(new protobuf.Field("createdAt", 7, "string"));

const UsersEnvelope = new protobuf.Type("Users")
  .add(new protobuf.Field("users", 1, "User", "repeated"))
  .add(new protobuf.Field("publicKey", 2, "string"));

UsersEnvelope.add(UserMessage);

export interface UsersExport {
  users: Array<User & { verified?: boolean }>;
  publicKey?: string;
}

export async function fetchUsersExport(): Promise<UsersExport> {
  const res = await api.get<ArrayBuffer>("/users/export", { responseType: "arraybuffer" });
  const buffer = new Uint8Array(res.data as unknown as ArrayBuffer);

  const decoded = UsersEnvelope.decode(buffer) as unknown as {
    users?: any[];
    publicKey?: string;
  };

  const publicKey = decoded.publicKey ? String(decoded.publicKey) : undefined;
  const users: (User & { verified?: boolean })[] = [];

  for (const u of decoded.users ?? []) {
    const emailHash = String(u.emailHash ?? "");
    const signature = String(u.emailSignature ?? "");

    let verified = false;
    if (publicKey && emailHash && signature) {
      verified = await cryptoUtils.verifyUserSignature(
        { emailHash, emailSignature: signature },
        publicKey
      );
    }

    console.log(
    verified
    );
if (verified) {
    users.push({
      id: Number(u.id),
      name: String(u.name ?? ""),
      email: emailHash,
      role: String(u.role ?? "user") as User["role"],
      status: u.status ? String(u.status) : undefined,
      createdAt: u.createdAt ? String(u.createdAt) : undefined,
      verified,
    });
  }
  }
  return { users, publicKey };
}
