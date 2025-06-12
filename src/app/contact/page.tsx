"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Mail, MapPin, Phone, Clock, Send, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitContactForm } from "./actions"
import { useFormState } from 'react-dom';
import { useEffect } from 'react';

export default function ContactPage() {
  const initialState = {
    success: false,
    message: '',
    errors: {}
  };
  const [state, formAction] = useFormState(submitContactForm, initialState);

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state.message]);

  return (
    <main className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Elegant jewelry consultation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400 mr-4" />
              <span className="text-amber-300 text-sm uppercase tracking-[0.2em] font-medium">Get in Touch</span>
              <div className="h-px w-12 bg-amber-400 ml-4" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto leading-relaxed">
              We&apos;d love to help you find the perfect piece or answer any questions about our collections
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-amber-50 py-4 px-4 md:px-6 border-b border-amber-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-amber-700">
            <Link href="/" className="hover:text-amber-900 transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-amber-400" />
            <span className="text-amber-900 font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Contact Form and Info */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Enhanced Contact Form */}
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl border border-gray-100">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Send className="w-6 h-6 text-amber-600 mr-3" />
                  <h2 className="text-3xl font-serif text-gray-900">Send Us a Message</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Whether you have questions about our collections, need assistance with sizing, or want to discuss a
                  custom design, our team is here to help you every step of the way.
                </p>
              </div>

              <form action={formAction} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                      First name *
                    </Label>
                    <Input
                      id="first-name"
                      name="first-name"
                      placeholder="Enter your first name"
                      className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                      Last name *
                    </Label>
                    <Input
                      id="last-name"
                      name="last-name"
                      placeholder="Enter your last name"
                      className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What can we help you with?"
                    className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Please provide details about your inquiry..."
                    className="min-h-[140px] border-gray-200 focus:border-amber-500 focus:ring-amber-500 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white font-medium text-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Enhanced Contact Information */}
            <div className="space-y-12">
              <div>
                <div className="flex items-center mb-6">
                  <MessageCircle className="w-6 h-6 text-amber-600 mr-3" />
                  <h2 className="text-3xl font-serif text-gray-900">Contact Information</h2>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Visit our showroom to experience our collections in person, or reach out to us through any of the
                  channels below. We&apos;re here to make your jewelry journey exceptional.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start space-x-4 p-6 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Our Showroom</h3>
                      <p className="text-gray-700 font-medium">123 Elegance Avenue</p>
                      <p className="text-gray-700">Jewelry District</p>
                      <p className="text-gray-700">New York, NY 10001</p>
                      <p className="text-amber-600 text-sm mt-2 font-medium">
                        Private appointments available
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                      <p className="text-gray-700 font-medium text-lg">+1 (212) 555-7890</p>
                      <p className="text-gray-600 text-sm mt-1">Toll-free consultation available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                      <p className="text-gray-700 font-medium">hello@goldenelegance.com</p>
                      <p className="text-gray-600 text-sm mt-1">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-xl border border-green-100">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                      <div className="space-y-1 text-gray-700">
                        <p>Monday - Friday: 10:00 AM - 7:00 PM</p>
                        <p>Saturday: 10:00 AM - 6:00 PM</p>
                        <p>Sunday: 12:00 PM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Enhanced FAQ Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Find answers to our most commonly asked questions. If you need additional information, our team is always
              ready to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                question: "Do you offer custom jewelry design services?",
                answer:
                  "Yes, we specialize in bespoke jewelry design. Our master craftsmen work closely with you to create unique pieces that reflect your personal style and story. From initial concept to final creation, we guide you through every step of the process.",
              },
              {
                question: "What is your return and exchange policy?",
                answer:
                  "We offer a 30-day return policy for unworn items in their original condition with all packaging and certificates. Custom and personalized pieces are non-returnable. All returns include free shipping and full refund processing.",
              },
              {
                question: "Do you provide jewelry repair and maintenance?",
                answer:
                  "We offer comprehensive repair and maintenance services, including cleaning, polishing, stone setting, and restoration. Our certified jewelers use only the finest materials and techniques to restore your pieces to their original beauty.",
              },
              {
                question: "How should I care for my jewelry?",
                answer:
                  "Store your jewelry in individual soft pouches or compartments to prevent scratching. Clean regularly with a soft cloth and avoid exposure to chemicals, perfumes, and extreme temperatures. We provide detailed care instructions with every purchase.",
              },
              {
                question: "Do you offer financing options?",
                answer:
                  "Yes, we provide flexible financing options including 0% APR for qualified customers. We also accept major credit cards, PayPal, and offer layaway programs for special occasions. Contact us to discuss the best payment option for you.",
              },
              {
                question: "Can I view pieces before purchasing online?",
                answer:
                  "We offer virtual consultations and can arrange private viewings at our showroom. For online purchases, we provide detailed photos, videos, and certificates of authenticity. We also offer a 'try before you buy' service for select pieces.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
