import { useTheme } from '../theme/ThemeContext.jsx';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="section">
      <h2>Settings</h2>
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Theme: {theme === 'dark' ? 'Dark' : 'Light'}</span>
        <button onClick={toggleTheme}>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </section>
  );
}