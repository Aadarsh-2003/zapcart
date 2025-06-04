import jwt from 'jsonwebtoken';


// Login seller : /api/seller/login
export const sellerLogin = async(req,res)=>{
    try {
        const{email , password} = req.body;

    if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL ){
        const token = jwt.sign({email},  process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('sellerToken', token, {
            httpOnly : true, // prevent javascript to access cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict', //CSRF protection
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time , 7 days
        })

        return res.json({success: true , message:"Logged In"});

    }else{
        return res.json({success: false , message:"Invalid Credentials"});
    }
    } catch (error) {
        console.log(error.message);
        res.json({success: false , message: error.message});
    }

}

// Seller isAuth : /api/seller/is-auth  
export const isSellerAuth = async (req,res)=>{
    try {
        const token = req.cookies?.sellerToken;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ success: true, email: decoded.email });

    } catch (error) {
        console.log(error.message);
        res.json({success: false , message: error.message});
    }
}

// Seller Logout  : /api/seller/logout
export const sellerLogout = async(req,res)=>{
    try {
        res.setHeader('Cache-Control', 'no-store'); // prevent edge caching

        res.clearCookie('sellerToken',{
            httpOnly : true, // prevent javascript to access cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict', //CSRF protection
            path: '/',
            expires: new Date(0),
        });
        return res.json({success:true , message:"Logged Out"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false , message: error.message});
    }
}