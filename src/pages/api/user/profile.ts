import { endpoint } from "../../../endpoint";
import * as userRepository from "../../../user/userRepository";

export default endpoint({
  async put(req, res) {
    const results = await userRepository.update(req.body);
    return [200, results];
  },
});
