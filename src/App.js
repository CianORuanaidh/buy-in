import './App.scss';
import KittyForm from './components/KittyForm/KittyForm';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="buy-in-app container">
      <Header></Header>
      <main>
        <p>This is Buyin app</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat porro dolore quidem doloremque labore reprehenderit! Dolorum mollitia, laborum incidunt sequi ipsum nesciunt iusto dolorem aut sint natus nobis odio at.</p>
        <KittyForm></KittyForm>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
