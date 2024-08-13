import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/init/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status) {
        res
          .status(200)
          .json({ status: 200, statusCode: 200, message: "success" });
      } else {
        // console.log(req.body);
        res.status(400).json({
          status: 400,
          statusCode: 400,
          message: "Failed",
        });
      }
    });
  } else {
    res.status(405).json({
      status: 405,
      statusCode: 405,
      message: "Method Not Allowed",
    });
  }
}
