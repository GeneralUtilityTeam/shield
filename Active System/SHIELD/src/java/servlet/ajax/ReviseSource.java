/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import dao.IntelligenceDAO;
import entity.Excerpt;
import entity.Source;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Franco
 */
public class ReviseSource extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ReviseSource</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ReviseSource at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       
        int sourceID = Integer.parseInt(request.getParameter("sourceID"));
        String desc = request.getParameter("desc");
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String publishedStr = request.getParameter("published");
        Date published = null;
        try {
            published = format.parse(publishedStr);
        } catch (ParseException ex) {
            Logger.getLogger(SaveSource.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        Source src = new Source();
        src.setId(sourceID);
        src.setDesc(desc);
        src.setPublished(published);
        
        ArrayList<Excerpt> excrList = new ArrayList<Excerpt>();
        
        IntelligenceDAO intlDAO = new IntelligenceDAO();
        
        JSONArray excrArr = new JSONArray(request.getParameter("excrArr"));
        for(Object j : excrArr){
            excrList.add(intlDAO.GetExcerpt((Integer)j));
        }
        
        HttpSession session = request.getSession();
        int userID = (int)session.getAttribute("userID");   
        
        int newID = -1;
        try{
            newID = intlDAO.ReviseSource(userID, sourceID, desc, published, excrList);
        }catch(Exception ex){
            System.out.println(ex);
        }
        
        JSONObject obj = new JSONObject();
        obj.put("id", newID);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(obj.toString());
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
