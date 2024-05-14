/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "profile-images-test-bucket.s3.us-east-1.amazonaws.com",
    ],
  },
}

export default nextConfig
