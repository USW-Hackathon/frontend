import ChatWidget from './components/ChatWidget';
import './index.css';
import ReactQueryProvider from './providers/ReactQueryProvider';
import RouterProvider from './providers/RouterProvider';

function App() {
  return (
    <>
      <ReactQueryProvider>
        <RouterProvider />
        <ChatWidget />
      </ReactQueryProvider>
    </>
  );
}

export default App;