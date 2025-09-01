import { Journal } from "@/types/journal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JOURNALS_KEY = "journals";

export class JournalStorage {
  private static async getAllJournals(): Promise<Journal[]> {
    try {
      const journalsJson = await AsyncStorage.getItem(JOURNALS_KEY);
      return journalsJson ? JSON.parse(journalsJson) : [];
    } catch (error) {
      console.error("Error fetching journals:", error);
      return [];
    }
  }

  private static async saveJournals(journals: Journal[]): Promise<void> {
    try {
      await AsyncStorage.setItem(JOURNALS_KEY, JSON.stringify(journals));
    } catch (error) {
      console.error("Error saving journals:", error);
      throw error;
    }
  }

  static async createJournal(journalData: Journal): Promise<Journal> {
    try {
      const journals = await this.getAllJournals();
      const newJournal: Journal = {
        ...journalData,
        id: Date.now().toString() + Math.random().toString(36),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      journals.push(newJournal);
      await this.saveJournals(journals);
      return newJournal;
    } catch (error) {
      console.error("Error creating journal:", error);
      throw error;
    }
  }

  static async updateJournal(updateData: Journal): Promise<Journal | null> {
    try {
      const journals = await this.getAllJournals();
      const journalIndex = journals.findIndex((journal) => journal.id === updateData.id);

      if (journalIndex === -1) {
        throw new Error("Journal not found");
      }

      const updatedJournal: Journal = {
        ...journals[journalIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      journals[journalIndex] = updatedJournal;
      await this.saveJournals(journals);
      return updatedJournal;
    } catch (error) {
      console.error("Error updating journal:", error);
      throw error;
    }
  }

  static async getJournalById(id: string): Promise<Journal | null> {
    try {
      const journals = await this.getAllJournals();
      return journals.find((journal) => journal.id === id) || null;
    } catch (error) {
      console.error("Error fetching journal by ID:", error);
      return null;
    }
  }

  static async getJournalsByZodiacSign(zodiacSign: string): Promise<Journal[]> {
    try {
      const journals = await this.getAllJournals();
      return journals.filter((journal) => journal.zodiacSign.toLowerCase() === zodiacSign.toLowerCase());
    } catch (error) {
      console.error("Error fetching journals by zodiac sign:", error);
      return [];
    }
  }

  static async getAllJournalsPublic(): Promise<Journal[]> {
    return this.getAllJournals();
  }

  static async deleteJournal(id: string): Promise<boolean> {
    try {
      const journals = await this.getAllJournals();
      const filteredJournals = journals.filter((journal) => journal.id !== id);

      if (filteredJournals.length === journals.length) {
        throw new Error("Journal not found");
      }

      await this.saveJournals(filteredJournals);
      return true;
    } catch (error) {
      console.error("Error deleting journal:", error);
      throw error;
    }
  }

  static async searchJournals(query: string): Promise<Journal[]> {
    try {
      const journals = await this.getAllJournals();
      const lowerQuery = query.toLowerCase();

      return journals.filter((journal) => journal.content.toLowerCase().includes(lowerQuery));
    } catch (error) {
      console.error("Error searching journals:", error);
      return [];
    }
  }

  static async clearAllJournals(): Promise<void> {
    try {
      await AsyncStorage.removeItem(JOURNALS_KEY);
    } catch (error) {
      console.error("Error clearing all journals:", error);
      throw error;
    }
  }
}
