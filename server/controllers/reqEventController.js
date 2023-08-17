const {EventRequest, AnsverRequest} = require('../models/models')
const ApiError = require('../error/ApiError');

class reqEventController {
    async create(req, res, next) {
        try {

            const {authorId, reciverId, eventId, description, name, eventTittle, contactDetails } = req.body
            const EventReq = await EventRequest.create({authorId, reciverId, eventId, description, name, eventTittle, contactDetails})
            return res.json(EventReq)

        } catch (e) {

            next(ApiError.badRequest(e.message))

        }
    }

    async getAll(req, res, next) {
        try {

            const EventReq = await EventRequest.findAll()
            return res.json(EventReq)

        } catch (e) {

            next(ApiError.badRequest(e.message))
            
        }
    }

    async getByIdReciever(req, res, next) {
        try {

            const {id}  = req.params
            const EventReq = await EventRequest.findAll({where:{reciverId:id}})
            return res.json(EventReq)

        } catch (e) {

            next(ApiError.badRequest(e.message))
            
        }
    }

    async editReq(req, res, next) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
        
            // Используйте метод findOne вместо findAll, чтобы найти одну запись
            const existingReq = await EventRequest.findOne({ where: { id: id } });
        
            if (!existingReq) {
              return res.status(404).json({ message: 'Запрос не найден' });
            }
        
            
            await existingReq.update(updatedData);
            

            if (updatedData.aprooved == true)
            {
                const idEvReq = existingReq.id
                const authorId = existingReq.reciverId
                const reciverId = existingReq.authorId
                const eventId = existingReq.eventId
                const tittleOfEvent = existingReq.eventTittle
                const contactDetails = existingReq.contactDetails
                
                const AnsverReq = await AnsverRequest.create({idEvReq, authorId, reciverId, eventId, contactDetails, tittleOfEvent})

                return res.json(AnsverReq);
            }else{
                return res.json(existingReq);
            }

            
          } catch (e) {
            next(ApiError.badRequest(e.message));
          }
        }

}




module.exports = new reqEventController()
