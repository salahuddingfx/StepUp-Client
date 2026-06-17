import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowLeft, ShieldCheck, Loader2, Smartphone, Building2, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const gatewayUI = {
  bkash: {
    name: 'bKash',
    icon: Smartphone,
    color: 'bg-[#E2136E]',
    hoverColor: 'hover:bg-[#C0105E]',
    textColor: 'text-[#E2136E]',
    bgLight: 'bg-[#E2136E]/10',
    borderColor: 'border-[#E2136E]/20',
    gradient: 'from-[#E2136E] to-[#C0105E]'
  },
  nagad: {
    name: 'Nagad',
    icon: Building2,
    color: 'bg-[#F5821F]',
    hoverColor: 'hover:bg-[#D8720F]',
    textColor: 'text-[#F5821F]',
    bgLight: 'bg-[#F5821F]/10',
    borderColor: 'border-[#F5821F]/20',
    gradient: 'from-[#F5821F] to-[#D8720F]'
  }
};

const CheckoutVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paymentId = searchParams.get('paymentId');
  const trxId = searchParams.get('trxId');
  const gateway = (searchParams.get('gateway') || 'bkash').toLowerCase();

  const [senderNumber, setSenderNumber] = useState('');
  const [manualTrxId, setManualTrxId] = useState(trxId || '');
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [orgNumber, setOrgNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const gw = gatewayUI[gateway] || gatewayUI.bkash;
  const GwIcon = gw.icon;

  useEffect(() => {
    if (!paymentId || !trxId) {
      toast.error('Invalid checkout session');
      navigate('/', { replace: true });
    }
  }, [paymentId, trxId, navigate]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.success && res.data) {
          setOrgNumber(gateway === 'nagad' ? res.data.nagadNumber : res.data.bkashNumber);
        }
      } catch (err) {
        // silent
      }
    };
    fetchSettings();
  }, [gateway]);

  const copyNumber = () => {
    if (orgNumber) {
      navigator.clipboard.writeText(orgNumber);
      setCopied(true);
      toast.success('Number copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSuccess = async () => {
    if (!senderNumber.trim()) {
      toast.error('Please enter your sender number');
      return;
    }
    if (!manualTrxId.trim()) {
      toast.error('Please enter your transaction ID');
      return;
    }
    setVerifying(true);
    try {
      const res = await api.post('/payments/verify', {
        paymentId,
        transactionId: manualTrxId.trim(),
        senderNumber: senderNumber.trim(),
        status: 'success'
      });
      if (res.success) {
        setStatus('success');
        setStatusMessage('Payment verified! You are now enrolled.');
        toast.success('Welcome aboard! Redirecting to your courses...');
        setTimeout(() => navigate('/dashboard/courses', { replace: true }), 2500);
      } else {
        setStatus('failed');
        setStatusMessage(res.message || 'Verification failed');
      }
    } catch (err) {
      setStatus('failed');
      setStatusMessage(err.message || 'Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  const handleCancel = async () => {
    setVerifying(true);
    try {
      await api.post('/payments/verify', {
        paymentId,
        transactionId: manualTrxId,
        status: 'failed'
      });
      setStatus('cancelled');
      setStatusMessage('Payment was cancelled.');
    } catch (err) {
      setStatus('cancelled');
      setStatusMessage('Payment was cancelled.');
    } finally {
      setVerifying(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 p-10 max-w-md w-full text-center space-y-5 shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
          >
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </motion.div>
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Payment Successful!</h2>
          <p className="text-xs text-gray-500">You have been enrolled in the course. Redirecting to your dashboard...</p>
          <div className="flex justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-brand-red" />
          </div>
        </motion.div>
      </div>
    );
  }

  if (status === 'failed' || status === 'cancelled') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 p-10 max-w-md w-full text-center space-y-5 shadow-2xl"
        >
          <div className="mx-auto h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Payment {status === 'cancelled' ? 'Cancelled' : 'Failed'}</h2>
          <p className="text-xs text-gray-500">{statusMessage}</p>
          <Link
            to="/programs"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-full text-xs font-bold transition-all shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Programs</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Gateway Header */}
        <div className={`${gw.color} rounded-t-3xl p-6 text-center text-white space-y-2`}>
          <div className="mx-auto h-16 w-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <GwIcon className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-extrabold">{gw.name} Payment</h2>
          <p className="text-xs text-white/80">Send money to the number below and confirm</p>
        </div>

        {/* Payment Body */}
        <div className="bg-white dark:bg-brand-darkGray rounded-b-3xl border-x border-b border-gray-200/50 dark:border-gray-800/80 p-6 space-y-5 shadow-xl">
          {/* Org Payment Number */}
          {orgNumber && (
            <div className={`${gw.bgLight} ${gw.borderColor} border rounded-2xl p-4 text-center space-y-2`}>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Send Money to this {gw.name} Number</p>
              <p className={`text-2xl font-black ${gw.textColor} tracking-wider`}>{orgNumber}</p>
              <button
                onClick={copyNumber}
                className={`inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full ${gw.color} text-white text-[10px] font-bold transition-all hover:opacity-90`}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy Number'}</span>
              </button>
            </div>
          )}

          {/* Transaction Info */}
          <div className="bg-gray-50 dark:bg-brand-black/30 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Invoice / TrxID</span>
              <span className="font-bold text-brand-black dark:text-white font-mono">{trxId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Gateway</span>
              <span className="font-bold flex items-center space-x-1">
                <GwIcon className="h-3.5 w-3.5" />
                <span>{gw.name}</span>
              </span>
            </div>
          </div>

          {/* Manual Confirmation Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Your Sender Number</label>
              <input
                type="text"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-4 py-3 bg-transparent border border-gray-250 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Transaction ID (From {gw.name} App)</label>
              <input
                type="text"
                value={manualTrxId}
                onChange={(e) => setManualTrxId(e.target.value)}
                placeholder="Enter your transaction ID"
                className="w-full px-4 py-3 bg-transparent border border-gray-250 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-brand-red transition-colors font-mono"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30 rounded-xl p-3 space-y-1">
            <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400">How to complete payment:</p>
            <ol className="text-[9px] text-amber-700 dark:text-amber-300 space-y-0.5 list-decimal list-inside">
              <li>Open your {gw.name} app and go to "Send Money"</li>
              {orgNumber && <li>Send the exact amount to the number above</li>}
              <li>Copy the Transaction ID from the confirmation SMS</li>
              <li>Enter your sender number and the Transaction ID</li>
              <li>Click "Confirm Payment" to notify the admin</li>
            </ol>
          </div>

          {/* Security Badge */}
          <div className={`${gw.bgLight} ${gw.borderColor} border rounded-xl p-3 flex items-center space-x-2.5`}>
            <ShieldCheck className={`h-5 w-5 ${gw.textColor}`} />
            <div>
              <p className="text-[10px] font-bold text-gray-600 dark:text-gray-300">Your payment will be verified by admin</p>
              <p className="text-[9px] text-gray-400">After admin approval, you will be enrolled in the course</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleSuccess}
              disabled={verifying}
              className={`w-full py-3 ${gw.color} ${gw.hoverColor} text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50`}
            >
              {verifying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirm Payment</span>
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={verifying}
              className="w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-750 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <XCircle className="h-4 w-4" />
              <span>Cancel Payment</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutVerify;
