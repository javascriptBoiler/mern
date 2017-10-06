import React from 'react';
import ReactDom from 'react-dom';
import { Icon, Label, Menu, Table, Container } from 'semantic-ui-react'
import Request from 'reqwest';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { onpage: 1, data: [], pages: 1 };
	}

	componentWillMount() {
		this.getdata();
		//this.handleChange = this.handleChange.bind(this);
	}

	getdata() {
		Request({
			url: '/pagi',
			method: 'get',
			headers: {
				'page': this.state.onpage
			},
			success: (resp) => {
				this.setState({ pages: resp.pages });
				this.setState({ data: resp.docs });

			}
		})
	}

	render() {
		return (
			<Container text>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Id</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						
						
							{this.state.data.map(function (listValue) {
								return (<Table.Row key={listValue._id}>
									<Table.HeaderCell>{listValue.name}</Table.HeaderCell>
									<Table.HeaderCell>{listValue._id}</Table.HeaderCell>
									</Table.Row>);
							})}
						

					</Table.Body>

					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan='3'>
								<Menu floated='right' pagination>
									<Menu.Item as='a' icon>
										<Icon name='left chevron' />
									</Menu.Item>
									<Menu.Item as='a'>1</Menu.Item>
									<Menu.Item as='a' icon>
										<Icon name='right chevron' />
									</Menu.Item>
								</Menu>
							</Table.HeaderCell>
							
						</Table.Row>
					</Table.Footer>
				</Table>
			</Container>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));