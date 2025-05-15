import './index.css';
import ReactQueryProvider from './providers/ReactQueryProvider';
import RouterProvider from './providers/RouterProvider';

function App() {
  return (
    <>
      <ReactQueryProvider>
        <RouterProvider />
      </ReactQueryProvider>
    </>
  );
}

export default App;
