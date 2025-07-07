import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, Calendar, Clock, Phone, Mail } from 'lucide-react';
import { orderAPI, OrderTracking } from '../utils/api';

const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [tracking, setTracking] = useState<OrderTracking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchTracking();
    }
  }, [orderId]);

  const fetchTracking = async () => {
    try {
      setIsLoading(true);
      const trackingData = await orderAPI.trackOrder(orderId!);
      setTracking(trackingData);
    } catch (err: any) {
      setError(err.message || 'Failed to load tracking information');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    
    switch (status.toLowerCase()) {
      case 'order confirmed':
      case 'confirmed':
        return <Package className="w-6 h-6 text-blue-500" />;
      case 'processing':
      case 'preparing':
        return <Package className="w-6 h-6 text-purple-500" />;
      case 'shipped':
      case 'in transit':
        return <Truck className="w-6 h-6 text-orange-500" />;
      case 'out for delivery':
        return <Truck className="w-6 h-6 text-orange-600" />;
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <Package className="w-6 h-6 text-gray-400" />;
    }
  };

  const getProgressPercentage = () => {
    if (!tracking) return 0;
    
    const totalSteps = tracking.events.length;
    const currentStepIndex = tracking.events.findIndex(event => 
      event.status.toLowerCase() === tracking.currentStatus.toLowerCase()
    );
    
    if (currentStepIndex === -1) return 0;
    return ((currentStepIndex + 1) / totalSteps) * 100;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tracking information...</p>
        </div>
      </div>
    );
  }

  if (error || !tracking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tracking Information Not Available</h2>
          <p className="text-gray-600 mb-6">{error || 'Unable to load tracking details'}</p>
          <Link
            to="/orders"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/orders"
            className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Order ID: {tracking.orderId}</p>
        </div>

        {/* Tracking Summary */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Tracking Number</h3>
              <p className="text-gray-600 font-mono text-sm">{tracking.trackingNumber}</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Current Status</h3>
              <p className="text-gray-600 capitalize">{tracking.currentStatus}</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h3>
              <p className="text-gray-600">{new Date(tracking.estimatedDelivery).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Order Confirmed</span>
              <span className="text-xs text-gray-500">In Transit</span>
              <span className="text-xs text-gray-500">Delivered</span>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tracking History</h2>
          
          <div className="space-y-6">
            {tracking.events.map((event, index) => {
              const isCompleted = index <= tracking.events.findIndex(e => 
                e.status.toLowerCase() === tracking.currentStatus.toLowerCase()
              );
              const isCurrent = event.status.toLowerCase() === tracking.currentStatus.toLowerCase();
              
              return (
                <div key={event.id} className="relative flex items-start space-x-4">
                  {/* Timeline Line */}
                  {index < tracking.events.length - 1 && (
                    <div className={`absolute left-3 top-8 w-0.5 h-16 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                  
                  {/* Status Icon */}
                  <div className={`relative z-10 ${
                    isCurrent ? 'ring-4 ring-red-200' : ''
                  } rounded-full`}>
                    {getStatusIcon(event.status, isCompleted)}
                  </div>
                  
                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${
                        isCurrent ? 'text-red-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {event.status}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <p className={`mt-1 ${
                      isCompleted ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {event.description}
                    </p>
                    
                    {event.location && (
                      <div className="flex items-center space-x-1 mt-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about your order or delivery, our customer support team is here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Call Us</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM EST</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="bg-green-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Support</h3>
                <p className="text-gray-600">support@caterhealth.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;