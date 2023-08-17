const {UserProfile} = require('../models/models')
const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const path = require('path');
const jwt = require('jsonwebtoken')

class ProfileController {
    async create(req, res, next) {
  try {
    const { userid, name, description, hobbys, country, city, age } = req.body;
    let fileName = null;

    if (req.files && req.files.img) {
      try {
        const { img } = req.files;
        fileName = uuid.v4() + '.jpg';
        await img.mv(path.resolve(__dirname, '..', 'static', fileName));
      } catch (e) {
        console.error('Error handling image:', e);
      }
    }

    const profileData = {
      userid,
      name,
      description,
      hobbys,
      country,
      city,
      age,
      img: fileName,
    };

    const profile = await UserProfile.create(profileData);
    return res.json(profile);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
}

    async getAll(req, res, next) {
        try {

            const profiles = await UserProfile.findAll()
            return res.json(profiles)

        } catch (e) {

            next(ApiError.badRequest(e.message))
            
        }
        
    }

    async getOne(req, res, next) {
        try {

            const {id}  = req.params
            const profile = await UserProfile.findAll({where:{userid:id}})
            return res.json(profile)

        } catch (e) {

            next(ApiError.badRequest(e.message))
            
        }
    }

    async editProfile(req, res, next) {
      try {
        const { id } = req.params;
        let updatedData = req.body; // Предполагается, что данные для обновления передаются через тело запроса
    
        try {
          const {  name, description, hobbys, country, city, age } = req.body;
          let fileName = null;
    
          if (req.files && req.files.img) {
            try {
              const { img } = req.files;
              fileName = uuid.v4() + '.jpg';
              await img.mv(path.resolve(__dirname, '..', 'static', fileName));
              
              updatedData.img = fileName; // Обновляем свойство img в объекте updatedData
            } catch (e) {
              console.error('Error handling image:', e);
            }
          }
    
          // Проверяем наличие профиля
          const existingProfile = await UserProfile.findOne({ where: { userid: id } });
          if (!existingProfile) {
            return res.status(404).json({ message: 'Профиль не найден' });
          }
    
          await existingProfile.update(updatedData);
    
          return res.json(existingProfile);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      } catch (e) {
        next(e); // Обработка ошибки верхнего уровня
      }
    }

}


module.exports = new ProfileController()
