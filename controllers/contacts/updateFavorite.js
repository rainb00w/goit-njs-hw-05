const {Contact} = require("../../models/contact")

const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
    console.log("REQ BODY", req.body)

      if(!req.body) {
        console.log('Not exist now')
      }
      console.log(req);
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
   
      if (!result) {
        throw RequestError(404, "Not found");
      }
      res.json(result);
   
  }

  module.exports = updateFavorite;