import { BrowserRouter as Router } from 'react-router-dom';
import MenuBar from './components/MenuBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <MenuBar />
        <main className="ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Job Portal</h1>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Find your dream job or hire the perfect candidate.</p>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App
