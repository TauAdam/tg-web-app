import { Button } from '../Button'

export const Header: React.FC = () => {
const tg = window.Telegram.WebApp;

const handleClose = ()=>{
	tg.Close()
}
	return (
		<header className='header'>
			<h1>Header</h1>

			<Button onClick={handleClose}>CLose</Button>
		</header>
	)
}