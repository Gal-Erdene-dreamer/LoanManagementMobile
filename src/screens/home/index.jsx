import { View, Text } from 'react-native'
import { ThemedView } from '../../components/ThemedView'
import tw from 'twrnc'
import { Avatar, Button, Card, IconButton } from 'react-native-paper'
import { BarChart, PieChart, PopulationPyramid, RadarChart } from 'react-native-gifted-charts'

function HomeScreen() {
  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }]

  return (
    <ThemedView hasHeaderTitle style={[tw`flex-1 items-center px-4 gap-4`]}>
      <Text>HomeScreen</Text>
      <View style={tw`flex-row gap-4`}>
        <Card style={tw`flex-1`}>
          <Card.Title
            title="Customers"
            subtitle="19"
            left={props => <Avatar.Icon {...props} icon="account-supervisor" />}
          />
        </Card>
        <Card style={tw`flex-1`}>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={props => <Avatar.Icon {...props} icon="account-supervisor" />}
            // right={props => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
          />
          <Card.Content>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
        </Card>
      </View>

      <BarChart data={data} />
      <PieChart data={data} donut />
    </ThemedView>
  )
}

export default HomeScreen
