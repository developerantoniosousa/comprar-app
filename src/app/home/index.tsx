import { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { Item } from "@/components/Item";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";

const FILTER_STATUS: FilterStatus[] = Object.values(FilterStatus);

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function handleAdd() {
    if (!description.trim()) {
      Alert.alert("Adicionar", "Informe a descrição para adicionar");
      return;
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description: description.trim(),
      status: FilterStatus.PENDING,
    };

    setDescription("");
    await itemsStorage.add(newItem);
    await getItemsByStatus();

    Alert.alert("Adicionado", `Adicionado ${description}`);
    setFilter(FilterStatus.PENDING);
  }

  async function getItemsByStatus() {
    try {
      const storage = await itemsStorage.getByStatus(filter);
      setItems(storage);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível filtrar os itens.");
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await getItemsByStatus();
    } catch (error) {
      console.error(error);
      Alert.alert("Remover", "Não foi possível remover.");
    }
  }

  async function handleClear() {
    try {
      Alert.alert("Limpar", "Deseja remover todos?", [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            await itemsStorage.clear();
            setItems([]);
          },
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Limpar", "Não foi possível remover todos os itens.");
    }
  }

  async function handleUpdateStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await getItemsByStatus();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Não foi possível atualizar o status");
    }
  }

  useEffect(() => {
    getItemsByStatus();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => handleUpdateStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  );
}
