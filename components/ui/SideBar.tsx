import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	Divider,
} from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { useContext } from 'react';
import { UIContext } from '../context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const SideBar = () => {
	const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

	return (
		<Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
			<Box sx={{ width: 250 }}>
				<Box sx={{ padding: '5px 10px' }}>
					<Typography variant="h4">Menu</Typography>
				</Box>

				<List>
					{menuItems.map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 == 0 ? (
									<InboxOutlinedIcon />
								) : (
									<MailOutlinedIcon />
								)}
							</ListItemIcon>

							<ListItemText>{text}</ListItemText>
						</ListItem>
					))}
				</List>

				<Divider />
			</Box>
		</Drawer>
	);
};
