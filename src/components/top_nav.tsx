import { Truck, Shield, Award, Phone } from "lucide-react"

const Top_Nav = () => {
  return (
    <div className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center lg:justify-between py-2">
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              <span>Lifetime Warranty</span>
            </div>
          </div>

          <div className="flex items-center">
            <Truck className="w-3 h-3 mr-2" />
            <span className="font-medium tracking-wide">FREE WORLDWIDE SHIPPING ON ORDERS OVER $500</span>
          </div>

          <div className="hidden lg:flex items-center">
            <Award className="w-3 h-3 mr-1" />
            <span>Certified Authentic</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top_Nav
