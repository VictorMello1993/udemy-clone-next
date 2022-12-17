import { endpoint } from "../../../endpoint";
import { getServerSession } from "../../../auth/getServerSession";
import * as userRepository from "../../../user/userRepository";

export default endpoint({
  async get(req, res) {
    const session = await getServerSession(req, res);
    const user = await userRepository.findById(session?.user.userId as number, {
      select: {
        id: true,
        fullname: true,
        email: true,
      },
    });

    return [200, user as userRepository.User];
  },
});
