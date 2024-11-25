'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, ShoppingCart, ChevronLeft, ChevronRight, X, Check, Facebook, Twitter, Instagram, Youtube, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
}

const products: Product[] = [
  { id: 1, name: "Camiseta de futbol", price: 19.99, image: "/messi.png", description: "Camiseta suave y cómoda, perfecta para jugar al futbol.", category: "Ropa" },
  { id: 2, name: "Zapatillas deportivas", price: 89.99, image: "/zapatillaDeportiva.png", description: "Zapatillas ligeras y resistentes para todo tipo de actividades.", category: "Calzado" },
  { id: 12, name: "Zapatillas Villeras", price: 1.99, image: "/vapormax.png", description: "Zapatillas para ir a robar.", category: "Calzado" },
  { id: 3, name: "Bolso de cuero", price: 129.99, image: "/bolso-cuero.png", description: "Bolso elegante y espacioso, ideal para el trabajo o salidas.", category: "Accesorios" },
  { id: 4, name: "Reloj analógico", price: 59.99, image: "/reloj.png", description: "Reloj clásico con correa de cuero y mecanismo preciso.", category: "Accesorios" },
  { id: 5, name: "Gafas de sol", price: 39.99, image: "/sol.png", description: "Gafas de sol con protección UV y diseño moderno.", category: "Accesorios" },
  { id: 6, name: "Pantalones Oversize", price: 49.99, image: "/pantalon-oversize.png", description: "Oversizes cómodos y duraderos, perfectos para el día a día.", category: "Ropa" },
  { id: 7, name: "Campera impermeable", price: 79.99, image: "/impermeable.png", description: "Chaqueta ligera y resistente al agua para días lluviosos.", category: "Ropa" },
  { id: 8, name: "Bufanda de lana", price: 24.99, image: "/bufanda.png", description: "Bufanda suave y cálida, ideal para el invierno.", category: "Accesorios" },
  { id: 9, "name": "Balón de fútbol", price: 29.99, image: "/pelota.jpg", description: "Balón de fútbol oficial, perfecto para partidos y entrenamientos.", category: "Deportes" },
  { id: 10, "name": "Set de maquillaje", price: 49.99, image: "/setmaquilaje.png", description: "Set completo de maquillaje con variedad de colores y texturas.", category: "Belleza" },
  { id: 11, "name": "Juego de sábanas", price: 39.99, image: "/juego-sabanas-sabanas.png", description: "Juego de sábanas suaves y duraderas para un descanso confortable.", category: "Hogar" },
  
]

const offerImages = [
  "/oferta1.png",
  "/oferta2.png",
  "/oferta3.png",
]

const categoryImages = {
  'Ropa': '/ropa-d1.png',
  'Calzado': '/Zapatillas.png',
  'Accesorios': '/acessorios.png',
  'Deportes': '/deportes.jpg',
  'Belleza': '/belleza.jpg',
  'Hogar': '/hogar-saludable.jpg',
}

export function MercadolibreClone() {
  const { toast } = useToast()
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { product, quantity: 1 }]
    })
    setIsDialogOpen(false)
    setIsCartOpen(true)
    navRef.current?.scrollIntoView({ behavior: 'smooth' })
    toast({
      title: "Agregado correctamente",
      description: `${product.name} ha sido agregado al carrito.`,
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)
  }

  const handlePrevOffer = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex === 0 ? offerImages.length - 1 : prevIndex - 1))
  }

  const handleNextOffer = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex === offerImages.length - 1 ? 0 : prevIndex + 1))
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <nav ref={navRef} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 sticky top-0 z-10 shadow-md`}>
        <div className="container mx-auto flex items-center justify-between">
        <h1><strong>UndefinedShop</strong></h1>
          <div className="flex-grow mx-4">
            <div className="relative">
              <Input type="text" placeholder="Buscar productos, marcas y más..." className={`w-full pl-10 pr-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : ''}`} />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="relative">
                <ShoppingCart className="mr-2" />
                Carrito
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className={darkMode ? 'bg-gray-800 text-white' : ''}>
              <SheetHeader>
                <SheetTitle className={darkMode ? 'text-white' : ''}>Carrito de Compras</SheetTitle>
                <SheetDescription className={darkMode ? 'text-gray-300' : ''}>
                  {cart.length === 0 ? (
                    <p>Tu carrito está vacío</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.product.id} className="flex justify-between items-center mb-4">
                          <div>
                            <p>{item.product.name}</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Cantidad: {item.quantity}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                            <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.product.id)}>
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4 pt-4 border-t border-gray-600">
                        <p className="font-bold mb-4">Total: ${getTotalPrice()}</p>
                        <Button className="w-full" onClick={() => alert('Compra realizada')}>
                          Realizar compra
                        </Button>
                      </div>
                    </>
                  )}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Button variant="ghost" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </div>
      </nav>

      <main className="container mx-auto mt-8">
        <div className="relative mb-8">
          <img src={offerImages[currentOfferIndex]} alt="Oferta principal" className="w-full h-72 object-cover rounded-lg" />
          <Button variant="ghost" className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2" onClick={handlePrevOffer}>
            <ChevronLeft />
          </Button>
          <Button variant="ghost" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2" onClick={handleNextOffer}>
            <ChevronRight />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {Object.entries(categoryImages).map(([category, imageUrl]) => (
            <Card 
              key={category} 
              className={`hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-700' : ''} ${selectedCategory === category ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleCategorySelect(category)}
            >
              <CardContent className="p-4 text-center cursor-pointer">
                <img src={imageUrl} alt={category} className="w-30 h-30 mx-auto mb-2" />
                <p className="font-semibold">{category}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCategory && (
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Categoría: {selectedCategory}</h2>
            <Button onClick={() => setSelectedCategory(null)} variant="outline">
              Limpiar filtro
            </Button>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">Ofertas del día</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter(product => !selectedCategory || product.category === selectedCategory)
            .map((product) => (
              <Card key={product.id} className={`hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-700' : ''}`}>
                <CardContent className="p-4">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Envío gratis</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mt-4">Ver detalles</Button>
                    </DialogTrigger>
                    <DialogContent className={darkMode ? 'bg-gray-800 text-white' : 'bg-white'}>
                      <DialogHeader>
                        <DialogTitle>{product.name}</DialogTitle>
                        <DialogDescription className={darkMode ? 'text-gray-300' : ''}>
                          <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
                          <p className="mb-4">{product.description}</p>
                          <p className="text-green-600 font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
                          <Button onClick={() => addToCart(product)}>
                            Agregar al carrito
                          </Button>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>

      <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white mt-12 py-8`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Acerca de</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-400">Quiénes somos</a></li>
                <li><a href="#" className="hover:text-yellow-400">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-yellow-400">Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-400">Comprar</a></li>
                <li><a href="#" className="hover:text-yellow-400">Vender</a></li>
                <li><a href="#" className="hover:text-yellow-400">Centro de seguridad</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Redes Sociales</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F" className="hover:text-yellow-400" aria-label="Facebook">
                  <Facebook />
                </a>
                <a href="https://x.com/home" className="hover:text-yellow-400" aria-label="Twitter">
                  <Twitter />
                </a>
                <a href="https://www.instagram.com/" className="hover:text-yellow-400" aria-label="Instagram">
                  <Instagram />
                </a>
                <a href="https://www.youtube.com/" className="hover:text-yellow-400" aria-label="YouTube">
                  <Youtube />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suscríbete</h3>
              <p className="mb-4">Recibe nuestras últimas ofertas</p>
              <div className="flex">
                <Input type="email" placeholder="Tu email" className={`rounded-r-none ${darkMode ? 'bg-gray-700 text-white' : ''}`} />
                <Button className="rounded-l-none">Suscribir</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 UndefinedShop. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

