import styles from './styles.module.css';

type DefaultButtonProps = {
  icon: React.ReactNode;
  color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

export function DefaultButton({
  icon,
  color = 'green',
  ...props
}: DefaultButtonProps) {
  return (
    <>
      <button
        className={`${styles.button} ${styles[color]}`}
        color={color}
        {...props}
      >
        {icon}
      </button>
    </>
  );
}
