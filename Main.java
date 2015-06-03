import java.io.*;
import java.net.*;
import java.util.Scanner;
import java.util.regex.*;

public class Main {

    public static void main(String[] args) throws IOException {
        PrintWriter textFile = null;
        try {
            textFile = new PrintWriter("result.txt");
            System.out.println("Enter the URL you wish to crawl..");
            System.out.print("@> ");
            String targetUrl = new Scanner(System.in).nextLine();

            String response = getContentByUrl(targetUrl);

            Matcher matcher = Pattern.compile(
                    "href=[\"'](.[^\"']+)[\"']"
            ).matcher(response);
            while (matcher.find()) {
                String url  = matcher.group(1);
                System.out.println(url);
                textFile.println(url);
            }
        } finally {
            if (textFile != null) {
                textFile.close();
            }
        }
    }

    private static String getContentByUrl(String urlString)
            throws IOException {
        URL url = new URL(urlString);
        URLConnection urlConnection = url.openConnection();
        BufferedReader in = null;
        StringBuilder response = new StringBuilder();
        try {
            in = new BufferedReader(new InputStreamReader(
                    urlConnection.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
        } finally {
            if (in != null) {
                in.close();
            }
        }
        return response.toString();
    }
}
