import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
export const registerUser = async (req, res) => {
  const { name, email, password, phone, age, post, etat, isAdmin = false } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "existe déjà" });

    const userData = {
      name,
      email,
      password,
      phone,
      etat,
      isAdmin,
    };

    if (isAdmin) {
      if (!post) return res.status(400).json({ message: "Le champ 'post' est requis pour un admin." });
      userData.post = post;
    } else {
      if (!age) return res.status(400).json({ message: "Le champ 'age' est requis pour un utilisateur non-admin." });
      userData.age = age;
    }

    const user = await User.create(userData);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      post: user.post,
      etat: user.etat,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: " invalides" });
    }

    res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  age: user.age,
  etat: user.etat,
  isAdmin: user.isAdmin,
  token: generateToken(user), 
});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "introuvable" });

  const { name, email, phone, password, age, post, etat } = req.body;

  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "déjà utilisé " });
    user.email = email;
  }

  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.etat = etat || user.etat;

  if (user.isAdmin) {
    if (post) user.post = post;
    user.age = undefined;
  } else {
    if (age) user.age = age;
    user.post = undefined;
  }

  if (password) user.password = password;

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    age: updatedUser.age,
    post: updatedUser.post,
    etat: updatedUser.etat,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id),
  });
};


export const deleteAccount = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.deleteOne();
  res.json({ message: "User deleted successfully" });
};
export const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const { name, age, post, etat, email, phone, password, isAdmin } = req.body;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json({ message: "Email déjà utilisé" });
      user.email = email;
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.etat = etat || user.etat;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    if (user.isAdmin) {
      if (post) user.post = post;
      user.age = undefined;
    } else {
      if (age) user.age = age;
      user.post = undefined;
    }

    if (password) user.password = password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      age: updatedUser.age,
      post: updatedUser.post,
      etat: updatedUser.etat,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.deleteOne();
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




