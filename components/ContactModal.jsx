import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

export default function ContactModal({ onClose, inline = false } = {}) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()
  const [status, setStatus] = useState(null)
  const firstInput = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose && onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    // focus first input on open
    setTimeout(() => firstInput.current && firstInput.current.focus(), 60)
  }, [])

  async function onSubmit(data) {
    try {
      setStatus('loading')
      await axios.post('/api/contact', data)
      setStatus('success')
      reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (inline) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register('name', { required: true })}
              ref={(e) => { register('name', { required: true }); firstInput.current = e }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && <p className="text-red-600 text-sm">Name is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <p className="text-red-600 text-sm">A valid email is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              {...register('phone')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              {...register('message', { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 min-h-[100px]"
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && <p className="text-red-600 text-sm">Message is required</p>}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 bg-charcoal text-white rounded-md font-semibold hover:opacity-95"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
            </div>

            <div>
              {status === 'success' && <span className="text-green-600">Message sent — we will contact you soon.</span>}
              {status === 'error' && <span className="text-red-600">Failed to send. Try again later.</span>}
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => onClose && onClose()} aria-hidden="true" />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
          className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl p-6"
        >
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <button
              aria-label="Close contact form"
              onClick={() => onClose && onClose()}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name', { required: true })}
                ref={(e) => { register('name', { required: true }); firstInput.current = e }}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && <p className="text-red-600 text-sm">Name is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <p className="text-red-600 text-sm">A valid email is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                {...register('phone')}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                {...register('message', { required: true })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 min-h-[100px]"
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              {errors.message && <p className="text-red-600 text-sm">Message is required</p>}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 bg-charcoal text-white rounded-md font-semibold hover:opacity-95"
                >
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </button>
                <button type="button" onClick={() => onClose && onClose()} className="ml-3 text-sm text-gray-600">Cancel</button>
              </div>

              <div>
                {status === 'success' && <span className="text-green-600">Message sent — we will contact you soon.</span>}
                {status === 'error' && <span className="text-red-600">Failed to send. Try again later.</span>}
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
