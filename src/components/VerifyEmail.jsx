import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyEmail } from '../api';
import { CheckCircle2, XCircle, Loader2, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }

    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        setStatus('success');
        setMessage(res.data.message);
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed.');
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-slate-900 p-10 rounded-[2.5rem] border border-white/10 shadow-2xl text-center"
      >
        {status === 'loading' && (
          <div className="py-10">
            <Loader2 className="w-16 h-16 text-brand-500 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Verifying your email...</h2>
            <p className="text-slate-500">Please wait while we activate your account.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="py-10">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white font-outfit mb-4">Account Verified!</h2>
            <p className="text-slate-400 mb-10">{message}</p>
            <Link 
              to="/login" 
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 text-slate-900 font-black py-4 rounded-2xl hover:bg-brand-400 shadow-xl shadow-brand-500/20 transition-all"
            >
              Login to your Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="py-10">
            <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-rose-400" />
            </div>
            <h2 className="text-3xl font-bold text-white font-outfit mb-4">Verification Failed</h2>
            <p className="text-rose-400/80 mb-10">{message}</p>
            <div className="space-y-4">
              <Link 
                to="/register" 
                className="w-full inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 font-bold py-4 rounded-2xl hover:bg-white/10 transition-all"
              >
                Try Registering Again
              </Link>
              <Link 
                to="/login" 
                className="block text-slate-500 font-bold text-sm hover:text-white transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
