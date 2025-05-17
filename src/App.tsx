import ChatWidget from './components/ChatWidget';
//import Footer from './components/Footer';
import './index.css';
import ReactQueryProvider from './providers/ReactQueryProvider';
import RouterProvider from './providers/RouterProvider';

function App() {
  return (
    <>
      <ReactQueryProvider>
        <RouterProvider />
        <ChatWidget />
        {/* <Footer /> */}
      </ReactQueryProvider>
    </>
  );
}

export default App;