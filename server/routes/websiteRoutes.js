const express = require("express");
const Website = require("../models/Website");
const auth = require("../middleware/auth");
const { buildStaticSite } = require("../utils/sitePublisher");

const router = express.Router();

router.post("/",auth,async(req,res)=>{

    try{

        const website = new Website({

            userId:req.user.id,

            title:req.body.title,

            template:req.body.template,

            content:req.body.content

        });

        await website.save();

        res.status(201).json(website);

    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});

router.get("/", auth, async (req, res) => {
  try {
    const websites = await Website.find({ userId: req.user.id });
    res.json(websites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/publish", auth, async (req, res) => {
  try {
    const { title, template, content, customization } = req.body;
    const pages = content?.pages || [
      { id: 'home', name: 'Home', components: content?.sections || [] },
      { id: 'about', name: 'About', components: content?.sections || [] },
    ];

    const result = buildStaticSite({
      title,
      slug: title,
      pages,
      template,
      customization,
    });

    const website = new Website({
      userId: req.user.id,
      title: title || 'My Website',
      template: template || 'Custom',
      content: { ...content, publishedUrl: result.url },
      published: true,
    });

    await website.save();

    res.status(201).json({ website, publishedUrl: result.url, slug: result.slug });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;