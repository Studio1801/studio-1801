import { Router, type IRouter } from "express";
import { db, insertWebsiteLeadSchema, websiteLeadsTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/leads", async (req, res, next) => {
  const parsed = insertWebsiteLeadSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Please complete every required field." });
    return;
  }

  try {
    const [lead] = await db
      .insert(websiteLeadsTable)
      .values(parsed.data)
      .returning({ id: websiteLeadsTable.id });

    res.status(201).json({ id: lead.id });
  } catch (error) {
    next(error);
  }
});

export default router;