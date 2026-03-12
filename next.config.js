/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eğer/app klasörünü kullanıyorsan ve pages router'ı tercih etmek istiyorsan:
  experimental: { appDir: false },

  // Route sonunda slash (/balance/) istersen true yap, istemezsen false
  trailingSlash: false,

  // İleride başka ayarlar eklersin...
}

module.exports = nextConfig
