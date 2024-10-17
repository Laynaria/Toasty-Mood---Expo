import { StyleSheet, View } from "react-native";
import Calendar from "../../components/Calendar";
import { getToasts } from "../../services/storage";

import { months, years } from "../../services/time";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { getCalendars } from "expo-localization";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  const [{ firstWeekday }] = getCalendars();

  // console.log(firstWeekday);
  // console.log(getCalendars()[0].firstWeekday);

  // firstWeekday === 2 ? lundi : dimanche

  const [toasts, setToasts] = useState(null);

  useEffect(() => {
    const loadToasts = async () => {
      setToasts(await getToasts());

      setIsLoading(false);
    };

    loadToasts();
  }, []);

  if (isLoading) {
    return <View />;
  }

  const checkDate = (year, month) => {
    return `${year}-${
      months.indexOf(month) >= 9
        ? months.indexOf(month) + 1
        : `0${months.indexOf(month) + 1}`
    }`;
  };

  type DataCalendar = { month: string; year: string };

  const dataCalendar: DataCalendar[][] = years(2022).map((year) =>
    months
      .filter(
        (month) =>
          months.indexOf(month) <= new Date().getMonth() ||
          year !== new Date().getFullYear()
      )
      .map((month) => ({
        month,
        year: year as string,
      }))
  );

  const checkMonth = (item) => {
    const index = dataCalendar
      .flat(Infinity)
      .findIndex(
        (i: DataCalendar) => i.month === item.month && i.year === item.year
      );

    if (index === 0) {
      return {
        marginTop: 108,
      };
    }

    if (index === dataCalendar.flat(Infinity).length - 1) {
      return {
        marginBottom: 143,
      };
    }

    return { marginBottem: 0 };
  };

  return (
    <View style={{ zIndex: 1, flex: 1 }}>
      <SafeAreaView style={styles.scroll}>
        <View style={styles.container}>
          <FlashList<DataCalendar>
            inverted
            estimatedItemSize={1000}
            showsVerticalScrollIndicator={false}
            data={dataCalendar.flat(Infinity).reverse() as DataCalendar[]}
            renderItem={({ item }) => (
              <Calendar
                style={checkMonth(item)}
                selectedMonth={item.month}
                selectedYear={item.year}
                toasts={toasts.filter(
                  (toast) =>
                    toast.date.slice(0, 7) === checkDate(item.year, item.month)
                )}
              />
            )}
            keyExtractor={(item) => `${item.month} ${item.year}`}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    zIndex: 1,
  },
  container: {
    flex: 1,
    zIndex: 1,
    gap: 22,
  },
});
