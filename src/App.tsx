import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, CartProvider, ThemeProvider, ToastProvider } from './contexts';
import ErrorBoundary from './components/ErrorBoundary';
import { queryClient } from './lib/react-query';
import Layout from './components/layout/Layout';
import PageLoader from './components/common/PageLoader';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Templates = lazy(() => import('./pages/Templates'));
const TemplateDetail = lazy(() => import('./pages/TemplateDetail'));
const Experts = lazy(() => import('./pages/Experts'));
const ExpertDetail = lazy(() => import('./pages/ExpertDetail'));
const Community = lazy(() => import('./pages/Community'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderComplete = lazy(() => import('./pages/OrderComplete'));
const MyPurchases = lazy(() => import('./pages/MyPurchases'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SellerDashboard = lazy(() => import('./pages/SellerDashboard'));
const UploadTemplate = lazy(() => import('./pages/UploadTemplate'));
const Settings = lazy(() => import('./pages/Settings'));
const Messages = lazy(() => import('./pages/Messages'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Pricing = lazy(() => import('./pages/Pricing'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Admin = lazy(() => import('./pages/Admin'));
const Support = lazy(() => import('./pages/Support'));
const SupportTickets = lazy(() => import('./pages/SupportTickets'));
const SellerRefunds = lazy(() => import('./pages/SellerRefunds'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              <CartProvider>
                <Router>
                  <Layout>
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/templates/:id" element={<TemplateDetail />} />
                  <Route path="/experts" element={<Experts />} />
                  <Route path="/experts/:id" element={<ExpertDetail />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-complete/:orderId" element={<OrderComplete />} />
                  <Route path="/my-purchases" element={<MyPurchases />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/seller-dashboard" element={<SellerDashboard />} />
                  <Route path="/upload-template" element={<UploadTemplate />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/support/tickets" element={<SupportTickets />} />
                  <Route path="/seller/refunds" element={<SellerRefunds />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </Layout>
                  </Router>
                </CartProvider>
              </ToastProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
}

export default App;
