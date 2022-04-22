import React from 'react';
import Comments from '~/desktop/comments/Comments';
import { Tabs } from 'antd';
import Discuss from '../Discuss/index'
const { TabPane } = Tabs;



const Index = ({ data }) => {
	return (
		<Tabs defaultActiveKey="1" className='comment-tab'>
			<TabPane tab="Ask Rodeybros" key="1">
				<Comments data={data} />
			</TabPane>
			<TabPane tab="Discussion" key="2">
				<Discuss data={data} />
			</TabPane>
		</Tabs>
	);
};

export default Index;
