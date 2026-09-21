import { useFormWithValidation } from '../hooks/useFormWithValidation';

export default function RegisterPage() {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isValid) return;
    // submit logic will be added later
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1 className="form__title">Register</h1>
      <div className="form__input-container">
        <label className="form__label">
          Name
          <input
            className="form__input"
            name="name"
            type="text"
            minLength={2}
            maxLength={40}
            required
            value={values.name ?? ''}
            onChange={handleChange}
          />
        </label>
        {errors.name && <span className="form__error">{errors.name}</span>}
      </div>
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
      <button
        className="form__submit-btn"
        type="submit"
        disabled={!isValid}
      >
        Register
      </button>
    </form>
  );
}
