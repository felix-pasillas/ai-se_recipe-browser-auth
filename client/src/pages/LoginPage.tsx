import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormWithValidation } from '../hooks/useFormWithValidation';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../utils/api';

export default function LoginPage() {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  const [submitError, setSubmitError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isValid) return;
    try {
      const { token, user } = await loginUser(values.email, values.password);
      login(token, user);
      navigate('/');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1 className="form__title">Login</h1>
      <div className="form__input-container">
        <label className="form__label">
          Email
          <input
            className="form__input"
            name="email"
            type="email"
            required
            value={values.email ?? ''}
            onChange={handleChange}
          />
        </label>
        {errors.email && <span className="form__error">{errors.email}</span>}
      </div>
      <div className="form__input-container">
        <label className="form__label">
          Password
          <input
            className="form__input"
            name="password"
            type="password"
            minLength={8}
            required
            value={values.password ?? ''}
            onChange={handleChange}
          />
        </label>
        {errors.password && (
          <span className="form__error">{errors.password}</span>
        )}
      </div>
      <button className="form__submit-btn" type="submit" disabled={!isValid}>
        Login
      </button>
      {submitError && <p className="form__error">{submitError}</p>}
    </form>
  );
}
