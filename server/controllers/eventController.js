const {Event} = require('../models/models')
const ApiError = require('../error/ApiError');

class EventController {
    async create(req, res, next) {
        try {

            const {userid, authorName, data, time, title, description, country, city, contactsdetails } = req.body

            const event = await Event.create({userid, authorName, data, time, title, description, country, city, contactsdetails})
            return res.json(event)

        } catch (e) {

            next(ApiError.badRequest(e.message))

        }
        
    }

    async getAll(req, res, next) {
        try {

            const event = await Event.findAll({where:{active:true}})
            return res.json(event)

        } catch (e) {

            next(ApiError.badRequest(e.message))

        }
        
    }

    
    async getOne(req, res, next) {
        try {

            const {id}  = req.params
            const event = await Event.findAll({where:{id:id}})
            return res.json(event)

        } catch (e) {

            next(ApiError.badRequest(e.message))
            
        }
    }

    async getByAuthor(req, res, next) {
        try {

            const {id}  = req.params
            const event = await Event.findAll({where:{userid:id}})
            return res.json(event)

        } catch (e) {

            next(ApiError.badRequest(e.message))
            
        }
    }

    async editEvent(req, res, next) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
        
            // Используйте метод findOne вместо findAll, чтобы найти одну запись
            const existingEvent = await Event.findOne({ where: { id: id } });
        
            if (!existingEvent) {
              return res.status(404).json({ message: 'Запрос не найден' });
            }
        
            // Обновляем найденную запись
            await existingEvent.update(updatedData);
        
            return res.json(existingEvent);
          } catch (e) {
            next(ApiError.badRequest(e.message));
          }
        }


}

module.exports = new EventController()

