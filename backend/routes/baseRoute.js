const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/professional", (req, res) => {
  const data = {
    professionalName: "Jon Connell",
    base64Image: "base64EncodedImageString",
    nameLink: {
      firstName: "Jon",
      url: "http://www.google.com",
    },
    primaryDescription: "Software Engineering Student at BYU-Idaho",
    workDescription1:
      "Software QA Intern at the Church of Jesus Christ of Latter-day Saints",
    workDescription2: "Online Grader at +BYU-Idaho",
    linkTitleText: "These are links",
    linkedInLink: {
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/jon-connell-886723237/",
    },
    githubLink: {
      text: "GitHub",
      link: "https://github.com/jm-connell",
    },
  };

  res.json(data);
});

// Get all contacts
router.get("/contacts", async (req, res) => {
  const databaseUrl = process.env.DATABASE_URL;

  const client = new MongoClient(databaseUrl);

  try {
    await client.connect();
    const database = client.db("cse341");
    const contacts = database.collection("contacts");

    const contactsArray = await contacts.find({}).toArray();

    res.json(contactsArray);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error connecting to database" });
  } finally {
    await client.close();
  }
});

// Get a single contact by id
router.get("/contacts/:id", async (req, res) => {
  const databaseUrl = process.env.DATABASE_URL;

  const client = new MongoClient(databaseUrl);

  try {
    await client.connect();
    const database = client.db("cse341");
    const contacts = database.collection("contacts");

    const contact = await contacts.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error connecting to database`,
    });
  } finally {
    await client.close();
  }
});

module.exports = router;
