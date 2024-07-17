/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        dangerouslyAllowSVG:true,
        domains:['res.cloudinary.com','placehold.co']
    },
};
// http://res.cloudinary.com/dggr7hsaj/image/upload/v1711526708/products/
export default nextConfig;
