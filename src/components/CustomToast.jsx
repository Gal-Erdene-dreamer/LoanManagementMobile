import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-paper'

export function CustomToast({ text1, text2, props }) {
  return (
    <View style={[styles.customSuccessToast, props?.color && { backgroundColor: props?.color }]}>
      <Icon source="wifi" size={24} color="#fff" />
      <View style={styles.textContainer}>
        <Text style={styles.customTitle}>{text1}</Text>
        {text2 && <Text style={styles.customMessage}>{text2}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  customSuccessToast: {
    width: '90%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  customTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  customMessage: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
})
