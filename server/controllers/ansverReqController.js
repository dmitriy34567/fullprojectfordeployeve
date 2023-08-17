const {AnsverRequest} = require('../models/models')
const ApiError = require('../error/ApiError');

class AnsverReqController {
    async create(req, res, next) {
        try {

            const {idEvReq, authorId, reciverId, eventId, contactDetails, tittleOfEvent } = req.body
            const AnsverReq = await AnsverRequest.create({idEvReq, authorId, reciverId, eventId, contactDetails, tittleOfEvent})
            return res.json(AnsverReq)

        } catch (e) {

            next(ApiError.badRequest(e.message))

        }
    }



    async getAll(req, res, next) {
        try {

            const AnsverReq = await AnsverRequest.findAll()
            return res.json(AnsverReq)

        } catch (e) {

            next(ApiError.badRequest(e.message))
            
        }
    }

    async getByIdReciever(req, res, next) {
        try {

            const {id}  = req.params
            const AnsverReq = await AnsverRequest.findAll({where:{reciverId:id}})
            return res.json(AnsverReq)

        } catch (e) {

            next(ApiError.badRequest(e.message))
            
        }
    }

    async getByIdAuthor(req, res, next) {
        try {

            const {id}  = req.params
            const AnsverReq = await AnsverRequest.findAll({where:{authorId:id}})
            return res.json(AnsverReq)

        } catch (e) {

            next(ApiError.badRequest(e.message))
            
        }
    }

    async getByIdEvReq(req, res, next) {
        try {

            const {id}  = req.params
            const AnsverReq = await AnsverRequest.findAll({where:{idEvReq:id}})
            return res.json(AnsverReq)

        } catch (e) {

            next(ApiError.badRequest(e.message))
            
        }
    }


}




module.exports = new AnsverReqController()
