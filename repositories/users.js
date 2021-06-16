const User=require('../model/user')

const findById = async(id)=>{
    return await User.findById(id)
}

const findByEmail = async(email)=>{
    return await User.findOne({email})
}

const create = async (body)=>{
    const user = new User(body)
    return await user.save()
}

const updateToken = async (userId, token) => {
    return await User.updateOne({ _id: userId }, { token })
  }

  
  const updateSubscription = async (userId, body) => {
    return await User.findByIdAndUpdate(userId, { ...body }, { new: true });
  };

  const updateAvatar = async (id, avatar) => {
    return await User.updateOne({ _id: id }, { avatar })
  }

module.exports={
    findById,
    findByEmail,
    create,
    updateToken,
    updateSubscription,
    updateAvatar
}