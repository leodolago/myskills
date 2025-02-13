import { useEffect, useState } from "react";
import { Platform, 
  SafeAreaView, 
  FlatList, 
  StyleSheet, 
  Text, 
  TextInput,
} from "react-native";
import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
  id: string
  name: string
}

export function Home() {
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<SkillData[]>([])
  const [greetting, setGretting] = useState('')

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    setMySkills(oldState => [...oldState, data])
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  useEffect(() => {
    const currentHour = new Date().getHours()

    if(currentHour < 12) {
      setGretting('Good morning')
    }
    else if(currentHour >= 12 && currentHour < 18) {
      setGretting('Good afternoon')
    }
    else {
      setGretting('Good night')
    }

  }, [mySkills])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, Leonardo</Text>
      <Text style={styles.grettings}>{greetting}</Text>
      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />
      <Button onPress={handleAddNewSkill} title="Add"/>
      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>
      <FlatList 
        data={mySkills} 
        keyExtractor={item => item.id}
        renderItem={({ item}) => (
          <SkillCard 
            skill={item.name} 
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  grettings: {
    color: '#fff'
  },
})