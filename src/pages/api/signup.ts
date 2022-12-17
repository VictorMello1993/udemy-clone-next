import { endpoint } from "../../endpoint";
import * as userRepository from "../../user/userRepository";

export default endpoint({
  async post(req, res) {
    req.body && (req.body.provider = "credentials");
    const results = await userRepository.create(req.body, {
      select: {
        id: true,
      },
    });
    return [200, results];
  },
});
