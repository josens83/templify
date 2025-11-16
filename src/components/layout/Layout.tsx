import React, { type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ToastContainer from '../ToastContainer';
import { useApp } from '../../contexts/AppContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};

export default Layout;
