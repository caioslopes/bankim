import { View, Text, TextInput, Button, Alert, FlatList, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { OPERATION, Transaction, useTransaction } from '@/db/hooks/useTransaction';

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [transactions, setTransactions] = useState<Transaction[]>();

  const transaction = useTransaction();

  async function create(operation: OPERATION) {
    try {
      if (isNaN(Number(value))) {
        return Alert.alert("Valor", "O valor precisa ser um número");
      }

      const response = await transaction.create({ operation: operation, value: Number(value), description })
      list();
      Alert.alert("Transação Registrada", "Transição registrada com id: " + response.insertedRowId);
    } catch (error) {
      console.log(error)
    }
  }

  async function list() {
    try {
      const response = await transaction.getAll();
      setTransactions(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    list();
    return () => { }
  }, [])

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text>You are in home</Text>

      <Link href="/">
        <Text>Go to Index</Text>
      </Link>

      <TextInput
        style={{
          height: 54,
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 7,
          paddingHorizontal: 16,
          width: "100%"
        }}
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      <TextInput
        style={{
          height: 54,
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 7,
          paddingHorizontal: 16,
          width: "100%"
        }}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableWithoutFeedback
        onPress={() => create(OPERATION.DEPOSIT)}
        onLongPress={() => create(OPERATION.WITHDRAWAL)}
      >
        <View style={styles.button}>
          <Text>Salvar</Text>
        </View>
      </TouchableWithoutFeedback>

      <FlatList data={transactions} keyExtractor={(item) => item.id.toLocaleString()} renderItem={({ item }) =>
        <View>
          <Text>{item.id}</Text>
          <Text>{item.operation}</Text>
          <Text>{item.value}</Text>
          <Text>{item.description}</Text>
          <Text>{item.createdAt}</Text>
        </View>} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  }
});